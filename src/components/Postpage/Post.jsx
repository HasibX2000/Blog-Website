import React from "react";
import Image from "../ui/Image";
import FeatureImage from "../../assets/thumbnail.jpg";

export default function Post() {
  return (
    <div className="space-y-5">
      <h1 className="text-xl lg:text-4xl font-bold text-secondary">
        Innovative Tech Startup Revolutionizes Remote Work with AI-Driven
        Solutions
      </h1>
      <Image src={FeatureImage} />
      <div className="space-y-5 text-base text-secondary">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque itaque
          omnis unde laboriosam illum nostrum praesentium rerum hic vel, fugit,
          odio debitis? Sequi ratione alias est reprehenderit natus nam
          eligendi?Lorem ipsum dolor sit amet consectetur adipisicing elit. In
          dolores assumenda molestias. Rem fuga quam, libero voluptate iusto
          beatae accusantium corrupti temporibus magnam perferendis animi
          doloribus excepturi nostrum iste? At.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque itaque
          omnis unde laboriosam illum nostrum praesentium rerum hic vel, fugit,
          odio debitis? Sequi ratione alias est reprehenderit natus nam
          eligendi? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Alias, nostrum provident vero nobis quo laboriosam expedita omnis id
          numquam illum?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Image src={FeatureImage} /> <Image src={FeatureImage} />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque itaque
          omnis unde laboriosam illum nostrum praesentium rerum hic vel, fugit,
          odio debitis? Sequi ratione alias est reprehenderit natus nam
          eligendi?Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Consequatur deleniti pariatur sed error. Nemo dolores id, illum
          tempora repudiandae harum nostrum unde quaerat doloremque architecto
          corporis vero, ratione rem maiores molestiae! Voluptatem, minima.
          Exercitationem, officia! Eligendi molestiae quam vero magnam, dolores
          consectetur ut, nam eaque sunt aspernatur deserunt aut quo?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque itaque
          omnis unde laboriosam illum nostrum praesentium rerum hic vel, fugit,
          odio debitis? Sequi ratione alias est reprehenderit natus nam
          eligendi?Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nostrum a, neque nobis recusandae suscipit ad magni nisi saepe maiores
          culpa iure sunt ab soluta, quibusdam veritatis sapiente, iste vitae?
          Facere obcaecati aliquid voluptatum, omnis recusandae iste corrupti
          nisi eius architecto voluptatibus voluptas itaque, optio sit eligendi.
          Fuga quod quas accusamus illo neque sint ex similique, labore,
          deleniti dignissimos accusantium amet voluptatum commodi eaque minima,
          ipsum obcaecati animi exercitationem? Odio asperiores cum quod sit
          natus corrupti architecto expedita inventore explicabo molestiae?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque itaque
          omnis unde laboriosam illum nostrum praesentium rerum hic vel, fugit,
          odio debitis? Sequi ratione alias est reprehenderit natus nam
          eligendi?
        </p>
      </div>
    </div>
  );
}
