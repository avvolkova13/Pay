import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomePage } from "@/components/HomePage";
import { getDictionary } from "@/i18n";

export default function Page() {
  const dictionary = getDictionary("en");

  return (
    <>
      <Header dictionary={dictionary} locale="en" routeKey="home" />
      <HomePage dictionary={dictionary} locale="en" />
      <Footer dictionary={dictionary} locale="en" />
    </>
  );
}
