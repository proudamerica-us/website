export interface DocusaurusContext {
  siteConfig: {
    title: string;
    tagline: string;
    url: string;
    baseUrl: string;
    [key: string]: any;
  };
  [key: string]: any;
}
declare function useDocusaurusContext(): DocusaurusContext;
export default useDocusaurusContext;
