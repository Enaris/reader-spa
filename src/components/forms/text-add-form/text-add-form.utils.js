export const formToAddRequestData = ( formData, aspUserId, tagsAdded, cover ) => ({
  ...formData, 
  tags: formData.tags ? formData.tags.map(t => t.id) : null,
  newTagsNames: tagsAdded ? tagsAdded.map(t => t.name) : null, 
  coverImage: cover, 
  aspUserId: aspUserId
})

export const formToOfflineText = ( formData, tagsAdded, newId ) => {
  var reading = { ...formData };
  reading.tags = [ ...reading.tags, ...tagsAdded ];
  reading.id = (+newId + 1).toString();
  reading.savedLocation = 0;

  return { data: reading, newTags: tagsAdded };
}