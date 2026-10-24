import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  Database,
  Server,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Zap,
  Terminal,
  HardDrive
} from 'lucide-react';
import {
  sectionContainerVariants,
  sectionItemVariants,
  staggerGridVariants,
  staggerCardVariants,
  sectionViewportConfig,
} from '../utils/motionVariants';

export const PipelineSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [throughput, setThroughput] = useState<number>(142500); // records/sec
  const [processedTotal, setProcessedTotal] = useState<number>(38421000);
  const [latency, setLatency] = useState<number>(34); // ms
  const [clusterHealth, setClusterHealth] = useState<'HEALTHY' | 'DEGRADED' | 'REBALANCING'>('HEALTHY');
  const [activeStage, setActiveStage] = useState<number>(2);
  const [selectedLog, setSelectedLog] = useState<string>('Spark streaming checkpoint committed to Delta Lake path s3://analytics-lake/events_v2');
  const [queryInput, setQueryInput] = useState<string>(
    'SELECT user_region, COUNT(*) as events, AVG(latency_ms) as avg_latency FROM delta_events GROUP BY user_region ORDER BY events DESC LIMIT 5;'
  );
  const [queryResult, setQueryResult] = useState<Array<{ region: string; events: string; latency: string }>>([
    { region: 'eu-central-1', events: '12,410,230', latency: '28.4ms' },
    { region: 'us-east-1', events: '9,890,140', latency: '31.2ms' },
    { region: 'ap-southeast-1', events: '6,740,110', latency: '44.8ms' },
    { region: 'me-central-1 (Cairo)', events: '5,310,900', latency: '19.1ms' },
    { region: 'sa-east-1', events: '4,070,620', latency: '52.3ms' },
  ]);

  // Telemetry ticker
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setThroughput((prev) => Math.max(90000, Math.min(300000, prev + Math.floor((Math.random() - 0.5) * 15000))));
      setProcessedTotal((prev) => prev + Math.floor(Math.random() * 80000));
      setLatency((prev) => Math.max(18, Math.min(85, prev + Math.floor((Math.random() - 0.5) * 6))));
      setActiveStage((prev) => (prev + 1) % 5);
    }, 1800);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSimulateHeal = () => {
    setClusterHealth('REBALANCING');
    setSelectedLog('Partition rebalance triggered across 16 worker executors. Injecting backpressure throttling...');
    setTimeout(() => {
      setClusterHealth('HEALTHY');
      setSelectedLog('Self-healing complete. Spark DAG repartitioned with 0 data loss. ACID commit verified.');
    }, 1600);
  };

  const handleRunQuery = () => {
    const randomMultiplier = Math.floor(Math.random() * 50000);
    setQueryResult([
      { region: 'eu-central-1', events: `${(12410230 + randomMultiplier).toLocaleString()}`, latency: '28.1ms' },
      { region: 'us-east-1', events: `${(9890140 + randomMultiplier).toLocaleString()}`, latency: '30.9ms' },
      { region: 'ap-southeast-1', events: `${(6740110 + randomMultiplier).toLocaleString()}`, latency: '43.2ms' },
      { region: 'me-central-1 (Cairo)', events: `${(5310900 + randomMultiplier).toLocaleString()}`, latency: '18.7ms' },
      { region: 'sa-east-1', events: `${(4070620 + randomMultiplier).toLocaleString()}`, latency: '51.5ms' },
    ]);
    setSelectedLog(`Executed distributed scan on Delta Lakehouse in 12ms. 5 partition files pruned.`);
  };

  const pipelineStages = [
    {
      title: '1. Event Ingestion',
      tech: 'Kafka 3.4',
      detail: '8 Topics • 32 Partitions',
      icon: Zap,
    },
    {
      title: '2. Buffer & Queue',
      tech: 'Distributed Broker',
      detail: 'Zero-loss replication factor 3',
      icon: Server,
    },
    {
      title: '3. Streaming Engine',
      tech: 'Spark 3.5 Structured',
      detail: 'Micro-batch 500ms watermarking',
      icon: Cpu,
    },
    {
      title: '4. Lakehouse Storage',
      tech: 'Delta Lake / S3',
      detail: 'ACID parity • Snappy Parquet',
      icon: HardDrive,
    },
    {
      title: '5. Query & BI',
      tech: 'Presto / T-SQL',
      detail: 'Sub-second analytical lookups',
      icon: Database,
    },
  ];

  return (
    <motion.section
      id="simulator"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewportConfig}
      variants={sectionContainerVariants}
      className="py-16 px-4 sm:px-6"
    >
      <motion.div variants={sectionContainerVariants} className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div variants={sectionItemVariants} className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Interactive Architecture Sandbox
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Big Data Pipeline Simulator
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Simulate real-time distributed ingestion, Spark structured streaming state, and Delta Lake ACID commits.
          </p>
        </motion.div>

        {/* Main Simulator Card */}
        <motion.div variants={sectionItemVariants} className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/20 space-y-8">
          {/* Controls & Metrics Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                  isRunning
                    ? 'bg-white/15 text-white border border-white/25 hover:bg-white/25'
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Stream</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Start Stream</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSimulateHeal}
                className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-mono hover:bg-white/20 border border-white/15 transition-colors flex items-center gap-1.5"
                title="Simulate partition node failure and auto-rebalance"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Test Failover</span>
              </button>
            </div>

            {/* Live Metrics Pill Trio — Monochrome Black & White */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
              <div className="px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="block text-[10px] font-mono text-zinc-400">THROUGHPUT</span>
                <span className="text-xs sm:text-sm font-bold font-mono text-white">
                  {throughput.toLocaleString()} rec/s
                </span>
              </div>

              <div className="px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="block text-[10px] font-mono text-zinc-400">P99 LATENCY</span>
                <span className="text-xs sm:text-sm font-bold font-mono text-white">
                  {latency}ms
                </span>
              </div>

              <div className="px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="block text-[10px] font-mono text-zinc-400">COMMITTED</span>
                <span className="text-xs sm:text-sm font-bold font-mono text-zinc-200">
                  {(processedTotal / 1000000).toFixed(1)}M
                </span>
              </div>

              <div className="px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="block text-[10px] font-mono text-zinc-400">CLUSTER</span>
                <span className="text-xs sm:text-sm font-bold font-mono text-white">
                  {clusterHealth}
                </span>
              </div>
            </div>
          </div>

          {/* 5-Stage Interactive Pipeline Flow */}
          <motion.div variants={staggerGridVariants} className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === idx;
              return (
                <motion.div
                  key={stage.title}
                  variants={staggerCardVariants}
                  className={`p-4 rounded-2xl border transition-all duration-300 relative ${
                    isActive
                      ? 'bg-white/10 border-white text-white scale-[1.02] shadow-lg'
                      : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white animate-pulse' : 'text-zinc-400'}`} />
                    <span className="text-[10px] font-mono text-zinc-500">Stage {idx + 1}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{stage.title}</h4>
                  <p className="text-[11px] font-mono text-zinc-300">{stage.tech}</p>
                  <p className="text-[10px] text-zinc-400 mt-2">{stage.detail}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Live Telemetry Log Feed */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-white/15 font-mono text-xs text-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping flex-shrink-0" />
            <span className="text-zinc-500 select-none">[SPARK-DAG]</span>
            <span className="truncate">{selectedLog}</span>
          </div>

          {/* Interactive SQL Sandbox */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-300" />
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  Lakehouse SQL Query Console (T-SQL / Spark SQL)
                </h3>
              </div>
              <button
                onClick={handleRunQuery}
                className="px-4 py-1.5 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
              >
                <span>Execute Query</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <textarea
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-2xl bg-black/70 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-white/50 resize-none"
            />

            {/* Query Output Table */}
            <div className="rounded-2xl border border-white/10 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-xs font-mono">
                <thead className="bg-white/5 text-zinc-400 border-b border-white/10">
                  <tr>
                    <th className="p-3">User Region</th>
                    <th className="p-3">Aggregated Events</th>
                    <th className="p-3">Calculated Avg Latency</th>
                    <th className="p-3 text-right">Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {queryResult.map((row) => (
                    <tr key={row.region} className="hover:bg-white/[0.02]">
                      <td className="p-3 font-semibold text-white whitespace-nowrap">{row.region}</td>
                      <td className="p-3 whitespace-nowrap">{row.events}</td>
                      <td className="p-3 text-white whitespace-nowrap">{row.latency}</td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] text-white font-mono">
                          <CheckCircle2 className="w-3 h-3" />
                          Validated
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
