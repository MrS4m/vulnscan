import { Router } from 'express';
/**
 * Composes all routes with proper dependency injection.
 *
 * Dependency graph:
 *   Scanner (Infrastructure) → UseCase (Application) → Controller (Presentation) → Route
 */
export declare function createRoutes(): Router;
//# sourceMappingURL=index.d.ts.map