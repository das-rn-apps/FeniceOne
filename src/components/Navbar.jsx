export default function Navbar() {
  return (
    <div className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Lead Manager</h1>

      <div className="flex items-center gap-4">
        <a href="/" className="hover:text-blue-600">LeadsV1</a>
        <a href="/create" className="hover:text-blue-600">Create</a>
      </div>
    </div>
  );
}
