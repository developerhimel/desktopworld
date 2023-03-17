import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, []);

  return;
}
