import { useRouter } from "next/navigation";

export async function submitRegisterForm(
  event: React.FormEvent<HTMLFormElement>,
  router: ReturnType<typeof useRouter>
) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const username = formData.get("username_input");
  const password = formData.get("password_input");

  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (response.ok) {
    router.push("/");
  } else {
    // Handle errors
  }
}
