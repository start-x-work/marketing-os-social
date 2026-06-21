/**
 * Public API for @start-x-work/marketing-os-social-core v0.1+
 */
export {
  AIError,
  CliError,
  COMMERCIAL_HINT,
  createProvider,
  FetchError,
  isModelKind,
  type ModelKind,
  render as renderOutput,
} from "@start-x-work/mos-kit";
export {
  type AccountAudit,
  type AccountCheck,
  auditAccount,
} from "./account/audit";
export {
  analyzeCalendar,
  type CalendarAnalysis,
  type PlannedPost,
  PlannedPostSchema,
} from "./calendar/analyze";
export { checkPromoRatio, type PromoRatioCheck } from "./calendar/promo-ratio";
export { ManualDataPlatform } from "./platforms/manual";
export type {
  Engagement,
  Post,
  Profile,
  SocialPlatform,
} from "./platforms/provider";
export {
  evaluatePost,
  type PostEval,
  PostEvalSchema,
} from "./post/evaluate";
export {
  checkUrlPlacement,
  type UrlPlacementCheck,
} from "./post/url-placement";
