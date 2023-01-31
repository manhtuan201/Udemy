import { Button, Checkbox, Form, Input } from "antd";

const CreateForm = () => {
  return (
    <>
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 5 }}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          rules={[{ message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default CreateForm;
