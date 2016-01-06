This is a fork of KeystoneJS

Things added / updated
1. Integrated medium-editor
    1. Declare by `extended: { type: Types.HtmlByMedium, height: 400 }`
    2. For S3 / Cloudinary image upload `extended: { type: Types.HtmlByMedium, height: 400, extra: 'mediumInsert' }`
2. Add interface for append CSS & JS to admin UI
    ```
keystone.set('admin css', '/styles/admin.min.css');
keystone.set('admin js', '/js/admin.min.js');
    ```
3. Add interface for admin UI nav bar render
    ```
keystone.set('admin nav', function(nav, user){
	console.log(nav);
	console.log(user);
	return nav;
});
    ```
4. Add interface for admin UI - item, footer render
    ```
Article.add({
	__footers: { type: Types.TextArray, hidden: true }
});
Article.schema.post('init', function (doc) {
    this.__footers = [JSON.stringify({
    	ui: 'Button',
    	key: 'edit-in-medium',
    	cls: 'success',
    	href: '/edit/article/' + this.slug,
    	text: 'Edit content in Medium now!'
    })];
});
    ```