
export const toQuerryData = formData => ({
  ...formData, 
  tags: formData.tags.map(t => t.id)
});