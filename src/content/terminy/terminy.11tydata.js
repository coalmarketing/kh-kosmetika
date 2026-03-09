export default {
    eleventyComputed: {
        statusIcon: (data) => {
            return data.published ? "🟢" : "🔴";
        }
    }
};