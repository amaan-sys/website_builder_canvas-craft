import { Helmet } from "react-helmet-async";
import { WebsiteEditor } from '@/components/editor/WebsiteEditor';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SiteBuilder - No-Code Website Builder</title>
        <meta name="description" content="Build beautiful websites without code." />
      </Helmet>
      <WebsiteEditor />
    </>
  );
};

export default Index;
