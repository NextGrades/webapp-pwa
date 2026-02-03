import Card from "@/components/Card";
// import UpdateToastPreview from "@/components/UpdateToastPreview";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/new")({
  component: RouteComponent,
});

// function RouteComponent() {
//   return <div>Hello "/new"!</div>
// }


function RouteComponent() {
  return <Card children={"New Page"}/>
}
