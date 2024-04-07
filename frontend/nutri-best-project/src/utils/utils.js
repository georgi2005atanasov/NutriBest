export async function getFormData(request) {
    const data = await request.formData();
    const userData = Object.fromEntries(data.entries());
    console.log(userData);
    return userData;
}