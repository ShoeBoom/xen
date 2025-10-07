const isNewTab = (url: string | undefined) => {
  if (url === undefined) return true;

  const regexes = [
    /.*:\/\/newtab/,
    /about:newtab/,
    /about:home/,
  ];
  return regexes.some((regex) => regex.test(url));
};

export default defineBackground(() => {
  browser.tabs.onCreated.addListener(async (tab) => {
    if (tab.pinned) return;
    if (tab.id === undefined || tab.windowId === undefined) return;
    const url = tab.pendingUrl;
    // console.log({url, tab});
    const isExternallyOpened = tab.openerTabId === undefined;
    if (isNewTab(url) || isExternallyOpened) {
      const tabs = await browser.tabs.query({ windowId: tab.windowId });
      const firstUnpinned = tabs.find((t) => !t.pinned);
      const boundary = firstUnpinned ? firstUnpinned.index : tabs.length;
      await browser.tabs.move(tab.id, { index: boundary });
    }
  });
});
