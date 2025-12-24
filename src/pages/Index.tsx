import { Helmet } from "react-helmet-async";
import { WebsiteEditor } from '@/components/editor/WebsiteEditor';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SiteBuilder - No-Code Website Builder</title>
        <meta name="description" content="Build beautiful websites without code. Drag, drop, and design your dream website with our intuitive builder." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/" />
      </Helmet>
      <WebsiteEditor />
    </>
  );
};

export default Index;
