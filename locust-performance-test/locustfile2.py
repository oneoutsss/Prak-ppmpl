from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)  # Wait between 1 to 5 seconds before the next task

    @task
    def get_users(self):
        self.client.get("/users")

    @task
    def get_user_by_id(self):
        user_id = 1  # Example user ID
        self.client.get(f"/users/{user_id}")

    @task
    def get_user_posts(self):
        user_id = 1  # Example user ID
        self.client.get(f"/users/{user_id}/posts")

    @task
    def create_post(self):
        payload = {
            "title": "New Post",
            "body": "This is a new post created for testing.",
            "userId": 1
        }
        headers = {'Content-Type': 'application/json'}
        self.client.post("/posts", json=payload, headers=headers)
