export const toOfflineUpdateData = (formData, readingId, removedTags, assignedTags, addedTags, oldTags) => ({
  reading: {
    id: readingId,
    title: formData.title, 
    text: formData.text, 
    description: formData.description, 
    links: formData.links
  },
  tagsUpdateData: {
    tagsAfterRemoval: oldTags.filter(t => !removedTags.some(ttr => ttr === t.id)), 
    tagsToAssign: assignedTags, 
    tagsToAdd: addedTags
  }
});