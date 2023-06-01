import ResponsiveAppBar from "../navbar/Navbar";
import Container from "@mui/material/Container";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ResponsiveAppBar />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
