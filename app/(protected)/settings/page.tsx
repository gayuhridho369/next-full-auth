import { logout } from "@/actions/logout";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form action={logout}>
        <Button variant={"default"} type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
