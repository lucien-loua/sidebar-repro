# sidebar-repro

Reproduction of a sidebar collapse animation issue with the shadcn/ui sidebar component, using `collapsible="icon"` and a custom `position="sticky"` variant.

**Status: fixed.** The original bug is kept in the git history if you want to see the broken state. Details below.

Original thread: https://x.com/luu_loua/status/2048756475166674969

## The issue

Collapsing the sidebar to icon mode had two problems:

1. The sidebar container snapped to its collapsed width instantly, no transition
2. The search field in the header used `display: none` (`group-data-[collapsible=icon]:hidden`), which can't be animated, so it popped in and out and made the nav items below shift abruptly

## The fix

Credit to [@shadcn](https://x.com/shadcn) who debugged this with me.

**1. Add a width transition on the sticky sidebar container** (`sidebar.tsx`)

The `fixed` variant already had it, the `sticky` branch didn't:

```diff
- ? "sticky top-0 hidden h-svh w-(--sidebar-width) shrink-0 md:flex"
+ ? "sticky top-0 hidden h-svh w-(--sidebar-width) shrink-0 transition-[width] duration-200 ease-linear md:flex"
```

**2. Replace `display: none` with animatable properties** (`files-sidebar.tsx`)

`display` can't transition. Animating `max-height`, `opacity` and `padding` instead, driven by the `group-data-[collapsible=icon]:*` pattern:

```diff
- <SidebarHeader className="border-b group-data-[collapsible=icon]:hidden">
+ <SidebarHeader className="border-b overflow-hidden max-h-14 transition-[max-height,opacity,padding] duration-200 ease-linear group-data-[collapsible=icon]:max-h-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:p-0">
```

The same treatment applies to anything conditionally rendered on collapse state. The footer here was originally gated with `{!isCollapsed && ...}`, which is a React unmount and has the same popping problem, so it now uses the same CSS pattern.

## Takeaway

For state-based show/hide animations with the shadcn sidebar, prefer `group-data-[collapsible=icon]:*` utilities on animatable properties (`max-height`, `opacity`, `padding`, `width`) over `hidden` or conditional rendering. The state lives in the DOM via data attributes, CSS does the rest.

## Running it

```bash
bun install
bun dev
```
