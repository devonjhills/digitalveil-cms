import 'outstatic/outstatic.css';
import { Outstatic } from 'outstatic';
import { OstClient } from 'outstatic/client';

interface PageProps {
  params: {
    ost: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const ostData = await Outstatic();
  return <OstClient ostData={ostData} params={params} />;
}
