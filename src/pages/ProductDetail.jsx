import { Link, useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import UserImg from "../asset/userIcon.png";
import ProductTag from "../component/ProductTag";
import ProductComment from "../component/ProductComment/ProductComment";
import heartIcon from "../asset/ic_heart.png";
import { useEffect, useState } from "react";
import { getProductComment, getProductDetail } from "../api";
import noPhotoImg from "../asset/nophoto.png";
import backIcon from "../asset/ic_back.png";
import noCommentImg from "../asset/Img_inquiry_empty.png";

function ProductDetail() {
  const [item, setItem] = useState();
  const [comment, setComment] = useState();
  const { productSlug } = useParams();

  const handleLoad = async () => {
    const result = await getProductDetail(productSlug);
    const { list } = await getProductComment({ productSlug, limit: 3 });
    if (result === undefined) {
      return;
    }
    setItem(result);
    setComment(list);
  };

  //이미지 링크가 잘못된 링크일 때, 기본 이미지 출력
  const onErrorImg = (e) => {
    e.target.src = noPhotoImg;
  };

  //날짜
  let date;
  if (item) {
    date = new Date(item.createdAt);
  }

  useEffect(() => {
    handleLoad();
  }, []);
  console.log(comment);

  return (
    <div className={styles.detail_section}>
      {item ? (
        <div className={styles.detail_wrap}>
          <div className={styles.product_container}>
            {item.images[0] ? (
              <img
                alt="상품이미지"
                src={item.images}
                className={styles.product_img}
                onError={onErrorImg}
              />
            ) : (
              <img
                alt="상품이미지"
                src={noPhotoImg}
                className={styles.product_img}
              />
            )}
            <div className={styles.product_wrap}>
              <div className={styles.product_detail_section}>
                <div className={styles.product_title_wrap}>
                  <h2 className={styles.product_title}>{item.name}</h2>
                  <h1 className={styles.product_price}>
                    {item.price.toLocaleString()}
                  </h1>
                  <div className={styles.product_line}></div>
                </div>
                <div className={styles.product_des_wrap}>
                  <span className={styles.product_description_title}>
                    상품 소개
                  </span>
                  <p className={styles.product_description}>
                    {item.description}
                  </p>
                </div>
                <div className={styles.product_tag_wrap}>
                  <span className={styles.product_tag_title}>상품 태그</span>
                  <div className={styles.product_tag_list}>
                    {item.tags.map((value) => (
                      <ProductTag value={value} disable={false} />
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.product_user_wrap}>
                <img
                  className={styles.user_img}
                  alt="유저이미지"
                  src={UserImg}
                />
                <div className={styles.user_info}>
                  <span className={styles.user_name}>{item.ownerNickname}</span>
                  <p className={styles.user_date}>
                    {date.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <img
                    className={styles.heart}
                    src={heartIcon}
                    alt="관심아이콘"
                  />
                  <span className={styles.heart_count}>
                    {item.favoriteCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.detail_line}></div>
          <form className={styles.comment_input_container}>
            <div className={styles.comment_input_wrap}>
              <label className={styles.comment_input_title}>문의하기</label>
              <textarea
                className={styles.comment_input}
                placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              />
            </div>
            <button className={styles.comment_button}>등록</button>
          </form>
          <div className={styles.comment_list_container}>
            {!comment.length && (
              <div className={styles.comment_no_wrap}>
                <img
                  className={styles.comment_no_img}
                  src={noCommentImg}
                  alt="문의없음이미지"
                />
                <span className={styles.comment_no_des}>
                  아직 문의가 없어요
                </span>
              </div>
            )}
            {comment.map((value) => (
              <ProductComment id={value.id} value={value} />
            ))}
          </div>
          <div className={styles.button_container}>
            <Link to="/items" style={{ textDecoration: `none` }}>
              <button className={styles.button_to_list}>
                목록으로 돌아가기
                <img
                  src={backIcon}
                  alt="돌아가기 아이콘"
                  className={styles.button_backicon}
                />
              </button>
            </Link>
          </div>
        </div>
      ) : (
        "로딩중..."
      )}
    </div>
  );
}

export default ProductDetail;