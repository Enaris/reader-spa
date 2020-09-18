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

export const toOnlineUpdateData = (formData,
  aspUserId, 
  readingId, 
  removedTags, 
  assignedTags, 
  addedTags, 
  changeText, 
  newCoverImage, 
  removeCover
  ) => ({
  aspUserId: aspUserId, 
  readingId: readingId, 
  title: formData.title, 
  text: changeText ? formData.text : null, 
  newCoverImage: newCoverImage, 
  description: formData.description, 
  links: formData.links, 

  changeText: changeText, 
  removeCover: removeCover, 

  // if tag was removed and added again do not remove it 
  tagsToRemove: !removedTags ? null : removedTags 
    .filter(rt => !assignedTags ? true : !assignedTags.some(at => at.id === rt.id))
    .map(rt => rt.id),
  // if tag was removed and added again do not add it (leave it as it is)
  tagsToAssign: !assignedTags ? null : assignedTags
    .filter(at => !removedTags ? true : !removedTags.some(rt => rt.id === at.id))
    .map(at => at.id), 
  tagsToAdd: !addedTags ? null : addedTags.map(at => at.name)

})