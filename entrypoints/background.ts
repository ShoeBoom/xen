const buildRegexes = (paths: string[]) =>
  paths.flatMap((p) => [
    new RegExp(`^[a-zA-Z]+://${p}/?$`),
    new RegExp(`^about:${p}/?$`),
  ]);
// some of these pages can be opended using "open in new tab"/target="_blank"
// ideally we would detect this and not move the tab to the start.
// but since openerTabId is set regardless of 
//       if the it was just active while opening a new tab 
//    vs the tab being responsible for opening the new tab
// we will default to moving the tab to the start since 99% of the time these are not opened by another tab, 
// should update this if my mental model is wrong.
const regexes = buildRegexes(["newtab", "history", "downloads", "home"]);

const isNewTab = (url: string | undefined) => {
  if (url === undefined) return true;

  return regexes.some((regex) => regex.test(url));
};

export default defineBackground(() => {
  browser.tabs.onCreated.addListener(async (tab) => {
    if (tab.pinned) return;
    if (tab.id === undefined || tab.windowId === undefined) return;
    const url = tab.pendingUrl;
    console.log({url, tab});
    const isExternallyOpened = tab.openerTabId === undefined;
    if (isNewTab(url) || isExternallyOpened) {
      const tabs = await browser.tabs.query({ windowId: tab.windowId });
      const firstUnpinned = tabs.find((t) => !t.pinned);
      const boundary = firstUnpinned ? firstUnpinned.index : tabs.length;
      await browser.tabs.move(tab.id, { index: boundary });
    }
  });
});
