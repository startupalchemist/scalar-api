import type {
  BrandTheme,
  BusinessVertical,
  CmsAuthoringMode,
  CmsContentKind,
  CmsDistributionChannel,
  CmsPlacementKind,
  ClientKey,
  LeadFieldDefinition,
  LeadStatusPipeline,
  ModuleFlags,
  ParticleLogoSettings,
} from "@platform/contracts";

export interface ClientConfig {
  key: ClientKey;
  displayName: string;
  legalName?: string;
  vertical: BusinessVertical;
  theme: BrandTheme;
  modules: ModuleFlags;
  leadPipeline: LeadStatusPipeline;
  leadForm: LeadFieldDefinition[];
  serviceSlugs: string[];
  seoFocus: string[];
  frontend: {
    headerStyle: "minimal" | "editorial" | "service-heavy";
    footerStyle: "simple" | "content-rich";
    particleLogo: ParticleLogoSettings;
    notes: string[];
  };
  cms: {
    collections: Array<{
      key: string;
      label: string;
      kinds: CmsContentKind[];
      slugPrefix: string;
      detailPageBasePath: string;
      indexPagePath: string;
      defaultPlacements: CmsPlacementKind[];
      navigationParentKey?: string;
      defaultShowInNavigation?: boolean;
      defaultShowInDropdown?: boolean;
    }>;
    enabledKinds: CmsContentKind[];
    defaultAuthoringMode: CmsAuthoringMode;
    allowedAuthoringModes: CmsAuthoringMode[];
    publishChannels: CmsDistributionChannel[];
    blogIndexKinds: CmsContentKind[];
    subscriberUpdateKinds: CmsContentKind[];
    newsletter: {
      enabled: boolean;
      requirePreviewApproval: boolean;
      defaultAudienceSegment: string;
      allowAiSubjectLines: boolean;
    };
    seo: {
      aiAssistedMetadata: boolean;
      aiAssistedInternalLinking: boolean;
      aiAssistedSchemaMarkup: boolean;
    };
  };
  deployment: {
    backendNamespace: string;
    frontendAppName: string;
  };
}
