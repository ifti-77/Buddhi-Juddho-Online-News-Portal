
import { addJournalist } from "@/actions/addJournalist";

export default function AddJournalist() {
    return (
        <div>
            <label>Add Journalist</label>
            <form action={addJournalist}>
                Name: <input type="text" name="name" /><br />
                Username: <input type="text" name="username" /><br />
                Password: <input type="password" name="password" /><br />
                Role: <select defaultValue='reporter' name="role">
                    <option value="reporter">Reporter</option>
                    <option value="editor">Editor</option>
                </select><br />
                <input type="submit" value="Create User" />
            </form>
        </div>
    )
}
