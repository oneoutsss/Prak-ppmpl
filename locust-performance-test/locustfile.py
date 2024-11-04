from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task(2)
    def get_all_users(self):
        self.client.get("/users")

    @task(1)
    def get_user_by_id(self):
        user_id = 1  # Anda bisa mengganti ID sesuai kebutuhan
        self.client.get(f"/users/{user_id}")

    @task(1)
    def create_user(self):
        self.client.post("/users", json={"name": "John Doe", "email": "johndoe@example.com"})

    @task(1)
    def update_user(self):
        user_id = 1
        self.client.put(f"/users/{user_id}", json={"name": "Updated Name"})

    @task(1)
    def delete_user(self):
        user_id = 1
        self.client.delete(f"/users/{user_id}")

   