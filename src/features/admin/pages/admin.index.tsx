import { useAppSelector } from "../../../store/hooks";


export default function DashboardAdmin() {
  const { user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const displayName = isAuthenticated
    ? user?.fullName || user?.email || "User"
    : "Guest";

  return (
    <div className="p-8">
      <header className="flex items-end justify-between">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="mt-1 font-display text-4xl">Dashboard</h1>
        </div>

        <p className="text-sm text-muted-foreground">
          Welcome back, <span className="font-semibold">{displayName}</span> 🌿
        </p>
      </header>
    </div>
  );
}