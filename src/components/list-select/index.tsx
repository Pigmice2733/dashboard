
const listSelect = ({onChange}: {onChange: (selected: string) => any}) => (
<form>
  <p>Please select your preferred contact method:</p>
  <div>
    <input type="radio" id="contactChoice1" name="contact" value="email">
    <label for="contactChoice1">Email</label>
    <input type="radio" id="contactChoice2" name="contact" value="phone">
    <label for="contactChoice2">Phone</label>
    <input type="radio" id="contactChoice3" name="contact" value="mail">
    <label for="contactChoice3">Mail</label>
  </div>
  <div>
  <button type="submit">Submit</button>
  </div>
</form>
)

export default ListSelect
