/**
 * Oxygen UI Core Types
 */

/**
 * Common Sizes used across components
 */
export type OxygenSize = 'sm' | 'md' | 'lg';

/**
 * Semantic Severities for alerts, toasts, and feedback
 */
export type OxygenSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'primary';

/**
 * Visual Variants for buttons and containers
 */
export type OxygenColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

/**
 * Positioning for overlays and sidebars
 */
export type OxygenPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Common state interfaces
 */
export interface OxygenChangeEvent<T = any> {
  value: T;
  originalEvent?: Event;
}

/**
 * Constants for internal use
 */
export const OXYGEN_DEFAULTS = {
  ripple: true,
  toastLife: 3000,
  position: 'top' as OxygenPosition,
  size: 'md' as OxygenSize
};
