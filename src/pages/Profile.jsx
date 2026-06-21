useEffect(() => {

  const loadProfile = async () => {

    try {

      const email =
        localStorage.getItem("email");

      if (!email) {
        navigate("/login");
        return;
      }

      const response =
        await api.get(
          `/auth/profile/${encodeURIComponent(email)}`
        );

      setUser(response.data);

    } catch (error) {

      console.error(error);

      navigate("/login");

    }

  };

  loadProfile();

}, [navigate]);