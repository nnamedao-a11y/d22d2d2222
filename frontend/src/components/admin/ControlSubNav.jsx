/**
 * Shared horizontal sub-navigation for the Admin → Control section.
 *
 * Renders 5 pill-style tabs that link to every Control page:
 *   • Business Metrics      /admin/business-metrics
 *   • Provider Pressure     /admin/provider-health
 *   • Routing Rules         /admin/routing-rules
 *   • Cadences              /admin/cadences
 *   • Score Rules           /admin/score-rules
 *
 * Behaviour:
 *   - Horizontal-scroll on mobile (no wrap, no broken layout)
 *   - Larger touch-friendly pills with generous vertical padding
 *   - Active state is derived from `useLocation()` so works without a prop
 *   - Sticky just below the main app header so it acts as a section header
 *
 * Usage:  <ControlSubNav /> at the very top of every Control page.
 */
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ChartLine,
  Gauge,
  Path,
  Timer,
  ChartLineUp,
} from '@phosphor-icons/react';
import { useLang } from '../../i18n';

const ControlSubNav = () => {
  const { t } = useLang();
  const { pathname } = useLocation();

  const tabs = [
    {
      to: '/admin/business-metrics',
      icon: ChartLine,
      label: t('adm_business_metrics') || 'Business Metrics',
    },
    {
      to: '/admin/provider-health',
      icon: Gauge,
      label: 'Provider Pressure',
    },
    {
      to: '/admin/routing-rules',
      icon: Path,
      label: t('routingRules') || 'Routing Rules',
    },
    {
      to: '/admin/cadences',
      icon: Timer,
      label: t('cadences') || 'Cadences',
    },
    {
      to: '/admin/score-rules',
      icon: ChartLineUp,
      label: t('scoreRules') || 'Score Rules',
    },
  ];

  return (
    <div
      className="-mx-4 md:-mx-6 lg:-mx-[50px] -mt-5 md:-mt-6 lg:-mt-8 mb-5 sm:mb-6 bg-white border-b border-[#E4E4E7]"
      data-testid="control-subnav"
    >
      <div className="px-4 md:px-6 lg:px-[50px] py-3 sm:py-3.5 overflow-x-auto scrollbar-none">
        {/* Canonical SectionTabs visual: #FAFAFA track + white active pill
            with 1.5px black ring. Same language used everywhere else
            (Documents, Marketing, Owner Dashboard sub-sections). */}
        <div
          role="tablist"
          aria-label="Control sections"
          className="inline-flex p-1 bg-[#FAFAFA] border border-[#E4E4E7] rounded-xl gap-1 max-w-full"
        >
          {tabs.map(({ to, icon: Icon, label }) => {
            const active = pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                role="tab"
                aria-selected={active}
                className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-lg text-[12.5px] sm:text-[13px] whitespace-nowrap shrink-0 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-black/10 ${
                  active
                    ? 'bg-white text-[#18181B] font-semibold ring-1.5 ring-[#18181B] shadow-[0_0_0_1.5px_#18181B] hover:bg-white'
                    : 'bg-transparent text-[#52525B] hover:text-[#18181B] font-medium'
                }`}
                style={{ fontFamily: 'inherit' }}
                data-testid={`control-tab-${to.split('/').pop()}`}
              >
                <Icon size={14} weight={active ? 'fill' : 'regular'} />
                <span className="truncate">{label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ControlSubNav;
