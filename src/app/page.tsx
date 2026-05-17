export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">SAFION TECH: SAFR PLATFORM</h1>
        <p className="text-lg">Institutional Intelligence & Forensic Auditing for XRPL</p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <div className="p-4 border rounded-lg bg-black/5">
            <h2 className="font-semibold">System Status</h2>
            <p className="text-sm text-green-600">Initializing Infrastructure...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
