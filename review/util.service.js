export const utilService = {
  getModalPosition,
};

function getModalPosition(type, ref) {
  const rect = ref.current.getBoundingClientRect();
  const pos = { top: rect.top, left: rect.left };
  const offset = window.innerWidth - rect.right < 150 ? 130 : 0;

  const positionLookup = {
    Members: { top: rect.top - 205, left: rect.left - offset - 30 },
    'Members ': { top: rect.bottom + 20, left: rect.left - offset },
    Labels: { top: rect.top - 150, left: rect.left - offset - 30 },
    Checklist: { top: rect.top - 110, left: rect.left - offset - 30 },
    Dates: { top: rect.top - 200, left: rect.left - offset - 50 },
    Attachments: { top: rect.top - 10, left: rect.left - offset - 30 },
    Group: { top: rect.top + 40, left: rect.left + 220 },
    'Create Label': { top: rect.top - 305, left: rect.left - offset - 260 },
    'Edit Label': { top: rect.top - 305, left: rect.left - offset - 260 },
  };

  if (positionLookup[type]) {
    const { top, left, maxTop } = positionLookup[type];
    pos.top = Math.min(top, maxTop || top);
    pos.left = left;
  }

  return pos;
}
