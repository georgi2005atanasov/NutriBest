export default function AddProduct() {
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
        
    //     try {
    //       const response = await fetch('YOUR_BACKEND_ENDPOINT', {
    //         method: 'POST',
    //         body: formData,
    //       });
    //       if (response.ok) {
    //         console.log('Product added successfully');
    //         // Handle success
    //       } else {
    //         // Handle server errors
    //       }
    //     } catch (error) {
    //       console.error('Submission error', error);
    //     }
    //   };

    return <form>
        <label>
            Product Name:
            <input type="text" name="name" required />
        </label>
        <label>
            Product Image:
            <input type="file" name="image" accept="image/*" required />
        </label>
        <button type="submit">Add Product</button>
    </form>
}