let cachedAvatarDataUrl: string | null = null;
let pendingPromise: Promise<string> | null = null;

/**
 * Generates a studio-lit circular headshot thumbnail from PERSONAL_INFO.avatar
 * Removes the top white margin and replaces the bright white wall with a dark studio spotlight
 * while preserving 100% authentic skin tones and facial detail.
 */
export function getStudioAvatarDataUrl(src: string): Promise<string> {
  if (cachedAvatarDataUrl) {
    return Promise.resolve(cachedAvatarDataUrl);
  }
  if (pendingPromise) {
    return pendingPromise;
  }

  pendingPromise = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        // Tight headshot crop centered on face & shoulders (removes top empty white margin)
        const sx = Math.round(w * 0.14);
        const sy = Math.round(h * 0.205);
        const sw = Math.round(w * 0.70);
        const sh = Math.round(h * 0.58);

        const size = 160;
        const offscreen = document.createElement('canvas');
        offscreen.width = size;
        offscreen.height = size;
        const octx = offscreen.getContext('2d');
        if (!octx) {
          resolve(src);
          return;
        }

        octx.imageSmoothingEnabled = true;
        octx.imageSmoothingQuality = 'high';
        octx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);

        const srcData = octx.getImageData(0, 0, size, size);
        const data = srcData.data;

        const visited = new Uint8Array(size * size);
        const queue = new Int32Array(size * size);
        let qHead = 0;
        let qTail = 0;

        const isExteriorWall = (idx: number) => {
          const r = data[idx * 4];
          const g = data[idx * 4 + 1];
          const b = data[idx * 4 + 2];
          return b > 196 && g > 204 && r > 210;
        };

        for (let x = 0; x < size; x++) {
          if (isExteriorWall(x)) {
            visited[x] = 1;
            queue[qTail++] = x;
          }
        }
        for (let y = 0; y < Math.floor(size * 0.82); y++) {
          const idxL = y * size;
          const idxR = y * size + (size - 1);
          if (!visited[idxL] && isExteriorWall(idxL)) {
            visited[idxL] = 1;
            queue[qTail++] = idxL;
          }
          if (!visited[idxR] && isExteriorWall(idxR)) {
            visited[idxR] = 1;
            queue[qTail++] = idxR;
          }
        }

        while (qHead < qTail) {
          const curr = queue[qHead++];
          const cx = curr % size;
          const cy = (curr - cx) / size;

          if (cx > 0) {
            const n = curr - 1;
            if (!visited[n] && isExteriorWall(n)) {
              visited[n] = 1;
              queue[qTail++] = n;
            }
          }
          if (cx < size - 1) {
            const n = curr + 1;
            if (!visited[n] && isExteriorWall(n)) {
              visited[n] = 1;
              queue[qTail++] = n;
            }
          }
          if (cy > 0) {
            const n = curr - size;
            if (!visited[n] && isExteriorWall(n)) {
              visited[n] = 1;
              queue[qTail++] = n;
            }
          }
          if (cy < size - 1) {
            const n = curr + size;
            if (!visited[n] && isExteriorWall(n)) {
              visited[n] = 1;
              queue[qTail++] = n;
            }
          }
        }

        // Expand exterior boundary by 2px for smooth anti-aliased edge
        let distMap = new Uint8Array(size * size);
        for (let i = 0; i < size * size; i++) {
          if (visited[i]) distMap[i] = 1;
        }
        for (let step = 1; step <= 2; step++) {
          const nextDist = new Uint8Array(distMap);
          for (let y = 1; y < Math.floor(size * 0.85); y++) {
            for (let x = 1; x < size - 1; x++) {
              const idx = y * size + x;
              if (distMap[idx] === 0) {
                if (
                  distMap[idx - 1] > 0 ||
                  distMap[idx + 1] > 0 ||
                  distMap[idx - size] > 0 ||
                  distMap[idx + size] > 0
                ) {
                  nextDist[idx] = step + 1;
                }
              }
            }
          }
          distMap = nextDist;
        }

        const alphaMap = new Float32Array(size * size);
        for (let i = 0; i < size * size; i++) {
          const d = distMap[i];
          if (d === 1) {
            alphaMap[i] = 1.0;
          } else if (d > 1) {
            const b = data[i * 4 + 2];
            if (b > 130) {
              alphaMap[i] = Math.min(1, Math.max(0, (b - 130) / (245 - 130)));
            }
          }
        }

        const outCanvas = document.createElement('canvas');
        outCanvas.width = size;
        outCanvas.height = size;
        const ctx = outCanvas.getContext('2d');
        if (!ctx) {
          resolve(src);
          return;
        }

        const grad = ctx.createRadialGradient(
          size * 0.5,
          size * 0.42,
          size * 0.05,
          size * 0.5,
          size * 0.48,
          size * 0.72
        );
        grad.addColorStop(0, '#484854');
        grad.addColorStop(0.55, '#24242c');
        grad.addColorStop(1, '#121216');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        const bgPixels = ctx.getImageData(0, 0, size, size).data;
        const finalImg = ctx.createImageData(size, size);
        const out = finalImg.data;

        for (let i = 0; i < size * size; i++) {
          const bgW = alphaMap[i];
          const pIdx = i * 4;
          if (bgW >= 0.99) {
            out[pIdx] = bgPixels[pIdx];
            out[pIdx + 1] = bgPixels[pIdx + 1];
            out[pIdx + 2] = bgPixels[pIdx + 2];
            out[pIdx + 3] = 255;
          } else if (bgW <= 0.01) {
            out[pIdx] = Math.min(255, data[pIdx] * 1.02);
            out[pIdx + 1] = Math.min(255, data[pIdx + 1] * 1.01);
            out[pIdx + 2] = data[pIdx + 2];
            out[pIdx + 3] = 255;
          } else {
            const fgW = 1 - bgW;
            out[pIdx] = Math.round(data[pIdx] * fgW + bgPixels[pIdx] * bgW);
            out[pIdx + 1] = Math.round(data[pIdx + 1] * fgW + bgPixels[pIdx + 1] * bgW);
            out[pIdx + 2] = Math.round(data[pIdx + 2] * fgW + bgPixels[pIdx + 2] * bgW);
            out[pIdx + 3] = 255;
          }
        }

        ctx.putImageData(finalImg, 0, 0);
        const dataUrl = outCanvas.toDataURL('image/jpeg', 0.92);
        cachedAvatarDataUrl = dataUrl;
        resolve(dataUrl);
      } catch {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });

  return pendingPromise;
}
