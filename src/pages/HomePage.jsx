import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import "../styles/HomePage.css";
import NavBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  loadMore,
  setCountries,
  setLoading,
  setError,
} from "../store/regionFilterSlice";
import Footer from "../components/Footer";
import Slider from "react-slick";
import SocialMediaButtons from "../components/SocialMediaButtons";

const HomePage = () => {
  const dispatch = useDispatch();
  const { region, visibleCount, allCountries, loading, error } = useSelector(
    (state) => state.regionFilter
  );
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch(
          "https://restcountries.com/v2/all?fields=name,region,flag"
        );
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        dispatch(setCountries(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCountries();
  }, [dispatch]);

  const filteredCountries =
    region === "All"
      ? allCountries
      : allCountries.filter((country) => country.region === region);

  const visibleCountries = filteredCountries.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCountries.length;
  let limitedCountries = visibleCountries.slice(0, 6);
  return (
    <Container fluid className="countries-container">
      <Row className="justify-content-center">
        <Col xl={10} lg={10} md={12}>
          <NavBar />
          <div className="divider-container">
            <hr className="divider-line left-one" />
            <h1 className="welcome-title">WELCOME</h1>
            <hr className="divider-line right-one" />
          </div>

          {loading && allCountries.length === 0 ? (
            <div className="text-center h-100 d-flex align-items-center justify-content-center">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <>
              <div className="slider-container">
                <Slider {...settings}>
                  {limitedCountries.map((country, index) => (
                    <div key={index} className="slider-item">
                      <Card className="slider-card">
                        <Card.Img
                          variant="top"
                          src={country.flag}
                          alt={`Flag of ${country.name}`}
                          loading="lazy" 
                        />
                      </Card>
                    </div>
                  ))}
                </Slider>
              </div>
              <Row className="countries-row">
                {visibleCountries.map((country, index) => (
                  <Col
                    key={`${country.alpha3Code}-${index}`}
                    xl={6}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className="mb-3"
                  >
                    <Card className="country-card" border="dark">
                      <div className="card-Image">
                        <Card.Img
                          variant="top"
                          src={country.flag}
                          alt={`Flag of ${country.name}`}
                          loading="lazy" 
                        />
                      </div>
                      <Card.Body >
                        <Card.Title >{country.name}</Card.Title>
                        <Card.Text>{country.region}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {hasMore && (
                <div className="text-center mt-4">
                  <Button
                    variant="dark"
                    onClick={() => dispatch(loadMore())}
                    disabled={loading}
                    className="load-more-btn"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </>
          )}
          {!loading && allCountries.length > 0 && (
            <>
            <SocialMediaButtons />
            <Footer />
            </>
          )}
          
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
