export function getUserRole(role: string) {
  if (role === "tourist") return "Turista";
  if (role === "admin") return "Administrador";

  return "Turista";
}
