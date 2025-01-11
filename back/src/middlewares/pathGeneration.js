
const pathGeneration = (schema) => {
    schema.pre('save', async function (next) {
        if (this.parentId) {
            const parentCategory = await this.model('Category').findById(this.parentId);
            if (!parentCategory) {
                return next(new Error('Parent category not found.'));
            }
            this.path = `${parentCategory.path}/${this.name}`;
        } else {
            this.path = this.name;
        }
        next();
    });
}

module.exports = pathGeneration;