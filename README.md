This is a fork of KeystoneJS

Things added / updated
1. Integrated medium-editor
    1. Declare by `extended: { type: Types.HtmlByMedium, height: 400 }`
    2. For S3 / Cloudinary image upload `extended: { type: Types.HtmlByMedium, height: 400, extra: 'mediumInsert' }`
2. Add interface for append CSS & JS to admin UI
    1. `keystone.set('admin css', '/styles/admin.min.css');`
    2. `keystone.set('admin js', '/js/admin.min.js');`