migrate((db) => {
  const collection = new Collection({
    "id": "gmu264omgk5f2pf",
    "created": "2022-12-20 20:26:40.698Z",
    "updated": "2022-12-20 20:26:40.698Z",
    "name": "music",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9vxtiea3",
        "name": "playlist",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "tvqtyb9m",
        "name": "tracks",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("gmu264omgk5f2pf");

  return dao.deleteCollection(collection);
})
