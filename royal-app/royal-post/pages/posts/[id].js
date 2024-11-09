import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Blog Post {id}</h1>
      <p>This is the content for post {id}.</p>
    </div>
  );
}