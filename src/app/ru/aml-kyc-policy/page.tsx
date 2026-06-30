import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/i18n";

export default function Page() {
  const dictionary = getDictionary("ru");

  return (
    <>
      <Header dictionary={dictionary} locale="ru" routeKey="aml" />
      <LegalPage dictionary={dictionary} slug="aml-kyc-policy" />
      <Footer dictionary={dictionary} locale="ru" />
    </>
  );
}
