import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomePage } from "@/components/HomePage";
import { getDictionary } from "@/i18n";

export default function Page() {
  const dictionary = getDictionary("ru");

  return (
    <>
      <Header dictionary={dictionary} locale="ru" routeKey="home" />
      <HomePage dictionary={dictionary} locale="ru" />
      <Footer dictionary={dictionary} locale="ru" />
    </>
  );
}
