import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        <section>{children}</section>
      </main>
    </>
  );
}
