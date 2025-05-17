import { Post } from "@/entities/post/Post";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}
