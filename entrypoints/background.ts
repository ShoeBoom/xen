export default defineBackground(() => {
  browser.tabs.onCreated.addListener(async (tab) => {
    if (tab.pinned) return;
    if (tab.id === undefined || tab.windowId === undefined) return;
    const tabs = await browser.tabs.query({ windowId: tab.windowId });
    const firstUnpinned = tabs.find((t) => !t.pinned);
    const boundary = firstUnpinned ? firstUnpinned.index : tabs.length;
    await browser.tabs.move(tab.id, { index: boundary });
  });
});
