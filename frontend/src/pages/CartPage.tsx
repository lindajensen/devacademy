import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { CourseIncludingInstructorAndRating } from "../App";

import { FaRegTrashCan } from "react-icons/fa6";

import {
	StyledCartWrapper,
	StyledCartList,
	StyledCartItem,
	StyledCartSummary,
	StyledEmptyCartMessage
} from "../components/styles/CartPage.styled";

function CartPage() {
	const [cart, setCart] = useState<CourseIncludingInstructorAndRating[]>(
		JSON.parse(localStorage.getItem("cart") || "[]")
	);
	const [cartTotal, setCartTotal] = useState("");

	useEffect(() => {
		const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

		setCartTotal(totalPrice.toFixed(2));
	}, [cart]);

	function removeFromCart(id: number) {
		const isConfirmed = confirm("Are you sure you want to let this course go?");

		if (!isConfirmed) {
			return;
		}

		const filteredCart = cart.filter((item) => item.course_id !== id);

		localStorage.setItem("cart", JSON.stringify(filteredCart));
		setCart(filteredCart);
	}

	return (
		<section>
			<h1>Your Cart</h1>
			<div>
				{cart.length === 0 ? (
					<StyledEmptyCartMessage>
						Empty for now, but your next great course is just a click away.
					</StyledEmptyCartMessage>
				) : (
					<StyledCartWrapper>
						<StyledCartList>
							{cart.map((item) => (
								<StyledCartItem key={item.course_id}>
									<div>
										<Link
											aria-label={`View details for the course ${item.course_name}`}
											to={`/courses/${item.course_id}`}>
											<h2>{item.course_name}</h2>
										</Link>
										<Link
											aria-label={`View instructor profile for ${item.instructor_name}`}
											to={`/instructors/${item.instructor_id}`}>
											{item.instructor_name}
										</Link>
										<p>${item.price}</p>
									</div>
									<button
										aria-label={`Remove ${item.course_name} from cart`}
										onClick={() => removeFromCart(item.course_id)}>
										<FaRegTrashCan />
									</button>
								</StyledCartItem>
							))}
						</StyledCartList>

						<StyledCartSummary>
							<h3>Total: ${cartTotal}</h3>
							<button aria-label="Proceed to checkout">Checkout</button>
						</StyledCartSummary>
					</StyledCartWrapper>
				)}
			</div>
		</section>
	);
}

export default CartPage;

{
	/* <section>
<h1>Your Cart</h1>
<StyledCartWrapper>
  {cart.length === 0 ? (
    <StyledEmptyCartMessage>
      Empty for now, but your next great course is just a click away.
    </StyledEmptyCartMessage>
  ) : (
    <div>
      <StyledCartList>
        {cart.map((item) => (
          <StyledCartItem key={item.course_id}>
            <div>
              <Link
                aria-label={`View details for the course ${item.course_name}`}
                to={`/courses/${item.course_id}`}
              >
                <h2>{item.course_name}</h2>
              </Link>
              <Link
                aria-label={`View instructor profile for ${item.instructor_name}`}
                to={`/instructors/${item.instructor_id}`}
              >
                {item.instructor_name}
              </Link>
              <p>${item.price}</p>
            </div>
            <button
              aria-label={`Remove ${item.course_name} from cart`}
              onClick={() => removeFromCart(item.course_id)}
            >
              <FaRegTrashCan />
            </button>
          </StyledCartItem>
        ))}
      </StyledCartList>

      <StyledCartSummary>
        <h2>Total:</h2>
        <p>${cartTotal}</p>
        <button aria-label="Proceed to checkout">Checkout</button>
      </StyledCartSummary>
    </div>
  )}
</StyledCartWrapper>
</section> */
}
