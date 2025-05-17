import { render, screen } from "@testing-library/react";
import PostCard from "./PostCard";

test("renderiza correctamente el título y contenido del post", () => {
  render(
    <PostCard
      post={{
        id: "1",
        title: "Post de prueba",
        content: "Contenido de prueba",
      }}
    />
  );
  expect(screen.getByText("Post de prueba")).toBeInTheDocument();
  expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
});
