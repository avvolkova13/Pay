import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/i18n";

export default function Page() {
  const dictionary = getDictionary("en");

  return (
    <>
      <Header dictionary={dictionary} locale="en" routeKey="terms" />
      <LegalPage dictionary={dictionary} slug="terms-of-service" />
      <Footer dictionary={dictionary} locale="en" />
    </>
  );
}
